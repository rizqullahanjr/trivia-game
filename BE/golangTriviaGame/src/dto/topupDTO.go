package dto

type TopupRequest struct {
	TotalDiamond int    `json:"total_diamond"`
	Email        string `json:"email"`
	Name         string `json:"name"`
	Price        int64  `json:"price"`
}

type TopupResponse struct {
	TotalDiamond int    `json:"total_diamond"`
	Email        string `json:"email"`
	Name         string `json:"name"`
	Price        int64  `json:"price"`
	SnapURL      string `json:"snap_url"`
}