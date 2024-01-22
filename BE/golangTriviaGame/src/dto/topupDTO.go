package dto

type TopupRequest struct {
	TotalDiamond int    `json:"total_diamond"`
	Email        string `json:"email"`
	Name         string `json:"name"`
	Price        int64  `json:"price"`
	OrderId      string `json:"order_id"`
	IdUser       int    `json:"id_user"`
}

type TopupResponse struct {
	IdUser       int    `json:"id_user"`
	TotalDiamond int    `json:"total_diamond"`
	Email        string `json:"email"`
	Name         string `json:"name"`
	Price        int64  `json:"price"`
	OrderId      string `json:"order_id"`
	SnapURL      string `json:"snap_url"`
}