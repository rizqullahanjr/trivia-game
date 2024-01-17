package midtranspayment

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"os"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

type RequiredData struct {
	TotalDiamond int `json:"total_diamond"`
	Email string `json:"email"`
	Name string `json:"name"`
	Price int64 `json:"price"`
}

func SnapURL(data RequiredData) string {

	SERVER_KEY := os.Getenv("SERVER_KEY")

	var s snap.Client
	s.New(SERVER_KEY, midtrans.Sandbox)

	//generate random string for ID
	randomString, err := GenerateRandomString(10)
	if err != nil {
		fmt.Printf("Error generating random string: %v\n", err)
		
	}

	req := & snap.Request{
		TransactionDetails: midtrans.TransactionDetails{
		  OrderID:  randomString,
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