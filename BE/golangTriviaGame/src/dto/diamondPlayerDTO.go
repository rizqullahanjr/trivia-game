package dto

type DiamondPlayerRequest struct {
	UserId  int    `json:"user_id"`
	IdOrder string `json:"id_order"`
	Diamond int    `json:"diamond"`
}

type DiamondPlayerResponse struct {
	Diamond int    `json:"diamond"`
	IdOrder string `json:"id_order"`
	UserId  int    `json:"user_id"`
}

type DiamondPlayerReq struct {
	UserId  int    `json:"user_id"`
	IdOrder string `json:"id_order"`
	Diamond int    `json:"diamond"`
}

type ReqVerifyPayment struct {
	OrderId string `json:"order_id"`
	UserID  int    `json:"user_id"`
}

type PlayerRequest struct {
	ID      int    `json:"id"`
	IdOrder string `json:"id_order"`
	Diamond int    `json:"diamond"`
}

type PlayerResponse struct {
	ID      int    `json:"id"`
	Diamond int    `json:"diamond"`
	IdOrder string `json:"id_order"`
}