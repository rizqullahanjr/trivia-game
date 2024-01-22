package midtranspayment

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"os"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/coreapi"
	"github.com/midtrans/midtrans-go/snap"
)

type RequiredData struct {
	TotalDiamond int `json:"total_diamond"`
	Email string `json:"email"`
	Name string `json:"name"`
	Price int64 `json:"price"`
	RandomString string `json:"random_string"`
}

func SnapURL(data RequiredData) string {

	SERVER_KEY := os.Getenv("SERVER_KEY")

	var s snap.Client
	s.New(SERVER_KEY, midtrans.Sandbox)

	//generate random string for ID
	// randomString, err := GenerateRandomString(16)
	// if err != nil {
	// 	fmt.Printf("Error generating random string: %v\n", err)
		
	// }

	req := & snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
		  OrderID:  data.RandomString,
		  GrossAmt: data.Price,
		}, 
		CreditCard: &snap.CreditCardDetails{
		  Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
		  FName: data.Name,
		  Email: data.Email,
		  Phone: "",
		},
	  }
	  snapResp, _ := s.CreateTransaction(req)
	  fmt.Printf("Snap Response: %+v", snapResp)
	  return snapResp.RedirectURL
}

func GenerateRandomString(length int) (string, error) {
	const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	charsetLength := big.NewInt(int64(len(charset)))
	result := make([]byte, length)

	for i := range result {
		randomIndex, err := rand.Int(rand.Reader, charsetLength)
		if err != nil {
			return "", err
		}
		result[i] = charset[randomIndex.Int64()]
	}

	return string(result), nil
}

//get paramater orderID with string value
func VerifyTransaction(orderID string) string {

	SERVER_KEY := os.Getenv("SERVER_KEY")

	var client coreapi.Client

	client.New(SERVER_KEY, midtrans.Sandbox)

	//parse parameter orderID into client.CheckTransaction
	transactionStatusResp, e := client.CheckTransaction(orderID)
	if e != nil {
		panic(e)
	} else {
		if transactionStatusResp != nil {
			// 5. Do set transaction status based on response from check transaction status
			if transactionStatusResp.TransactionStatus == "capture" {
				if transactionStatusResp.FraudStatus == "challenge" {
					// TODO set transaction status on your database to 'challenge'
					// e.g: 'Payment status challenged. Please take action on your Merchant Administration Portal
				} else if transactionStatusResp.FraudStatus == "accept" {
					// TODO set transaction status on your database to 'success'
				}
			} else if transactionStatusResp.TransactionStatus == "settlement" {
				return "settlement"
			} else if transactionStatusResp.TransactionStatus == "deny" {
				// TODO you can ignore 'deny', because most of the time it allows payment retries
				// and later can become success
			} else if transactionStatusResp.TransactionStatus == "cancel" || transactionStatusResp.TransactionStatus == "expire" {
				// TODO set transaction status on your databaase to 'failure'
			} else if transactionStatusResp.TransactionStatus == "pending" {
				return "pending"
			}
		}
	}

	return ""
}