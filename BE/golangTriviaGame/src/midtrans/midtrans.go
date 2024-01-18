package midtransPayment

import (
	"crypto/rand"
	"fmt"
	"math/big"
	"os"

	"github.com/midtrans/midtrans-go"
	"github.com/midtrans/midtrans-go/snap"
)

func SnapURL() string {

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
		  OrderID:    randomString,
		  GrossAmt: 10000,
		}, 
		CreditCard: &snap.CreditCardDetails{
		  Secure: true,
		},
		CustomerDetail: &midtrans.CustomerDetails{
		  FName: "lutfhi",
		  LName: "jokowi",
		  Email: "LJ@doe.com",
		  Phone: "081234567890",
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