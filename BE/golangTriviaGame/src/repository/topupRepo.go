package repository

import (
	"fmt"
	"golangTriviaGame/src/models"

	"gorm.io/gorm"
)

type ITopupRepository interface {
	FindDataTopup() ([]models.Topup, error)
	TopupDiamond(req models.Topup) (models.Topup, error)
	FindOneByOrderID(orderID string) (models.Topup, error)
}


type topupRepository struct {
	db *gorm.DB
}

func NewTopupRepository(db *gorm.DB) ITopupRepository {
	return &topupRepository{
		db: db,
	}
}

func (r *topupRepository)FindDataTopup()([]models.Topup, error){
	var topup []models.Topup
	err := r.db.Find(&topup).Error
	if err != nil {
		fmt.Println(err)
		return nil, err
	}
	fmt.Println(topup)
	return topup, err
}

// func (r *topupRepository) TopupDiamond(req models.Topup) (models.Topup, error) {

// 	randomSTring, _ := midtranspayment.GenerateRandomString(10)
	
// 	dataTopup := &models.Topup{
// 		TotalDiamond: req.TotalDiamond,
// 		Email:        req.Email,
// 		Name:         req.Name,
// 		Price:        req.Price,
// 		OrderId:      randomSTring,
// 		// DiamondPlayerID: req.DiamondPlayerID,
// 	}
	
// 	if err := r.db.Create(dataTopup).Error; err != nil {
        
//         fmt.Println(err)
//         return models.Topup{}, err
//     }

//     return *dataTopup, nil
// }
func (r *topupRepository) TopupDiamond(req models.Topup) (models.Topup, error) {

	dataTopup := &models.Topup{
		TotalDiamond: req.TotalDiamond,
		IdUser:       req.IdUser,
		Email:        req.Email,
		Name:         req.Name,
		Price:        req.Price,
		OrderId:      req.OrderId,
		// DiamondPlayerID: req.DiamondPlayerID,
	}

	if err := r.db.Create(dataTopup).Error; err != nil {

		fmt.Println(err)
		return models.Topup{}, err
	}
	return *dataTopup, nil
}

func (r *topupRepository) FindOneByOrderID(orderID string) (models.Topup, error) {
	var topup models.Topup
	err := r.db.Where("order_id = ?", orderID).First(&topup).Error
	if err != nil {
		fmt.Println(err)
		return models.Topup{}, err
	}
	
	return topup, err
}

