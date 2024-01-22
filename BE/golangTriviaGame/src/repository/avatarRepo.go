package repository

import (
	"golangTriviaGame/src/models"

	"gorm.io/gorm"
)

type IAvatarRepo interface {
	FindAllAvatar() (models.Avatars, error)
	FindPayAvatar() (models.Avatars, error)
	FindFreeAvatar() (models.Avatars, error)
	FindOneAvatar(id int) (models.Avatar, error)
	FindUpdateAvatar(id int) models.Avatars
}

// SAvatarRepo find in database
type SAvatarRepo struct {
	db *gorm.DB
}

func AvatarRepo(db *gorm.DB) *SAvatarRepo {
	return &SAvatarRepo{db}
}

func (r *SAvatarRepo) FindAllAvatar() (models.Avatars, error) {
	var avatars models.Avatars
	err := r.db.Find(&avatars).Error
	return avatars, err
}

func (r *SAvatarRepo) FindPayAvatar() (models.Avatars, error) {
	var avatars models.Avatars
	err := r.db.Where("cost > ?", 0).Find(&avatars).Error
	return avatars, err
}

func (r *SAvatarRepo) FindFreeAvatar() (models.Avatars, error) {
	var avatars models.Avatars
	err := r.db.Not("cost > ?", 0).Find(&avatars).Error
	return avatars, err
}

func (r *SAvatarRepo) FindOneAvatar(id int) (models.Avatar, error) {
	var avatar models.Avatar
	err := r.db.First(&avatar, "id = ?", id).Error
	return avatar, err
}

func (r *SAvatarRepo) FindUpdateAvatar(id int) models.Avatars {
	var avatars models.Avatars
	sqlQuery := `SELECT q.id, q.image,
                 CASE WHEN q.player_id = ? THEN 0
                      ELSE q.cost
                      END AS cost
                 FROM ( SELECT * FROM avatars 
                        LEFT JOIN ( SELECT * FROM user_avatars
                                    WHERE player_id = ? ) u
                        ON avatars.id = u.avatar_id ) q
                 ORDER BY cost ASC`
	r.db.Raw(sqlQuery, id, id).Scan(&avatars)

	return avatars
}
