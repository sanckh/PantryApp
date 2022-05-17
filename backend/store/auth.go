package store

import (
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/model"
	"golang.org/x/crypto/bcrypt"
)

type metaClaims struct {
	AccountID string
	jwt.StandardClaims
}

// Register registers a new user given the provided data
func Register(c *gin.Context) {
	data := &model.User{}

	if err := c.BindJSON(data); err != nil {
		c.JSON(http.StatusNotFound, gin.H{})
		return
	}

	password, _ := bcrypt.GenerateFromPassword([]byte(data.Password), 12)

	user := model.User{
		Id:       data.Id, // TODO verify uniqueness
		Name:     data.Name,
		Email:    data.Email, // TODO verify uniqueness
		Password: password,
	}

	// Register new user
	AddUser(&user)

	// Return user
	c.JSON(http.StatusOK, &user)
}

// Login logs in a user and adds the jwt to the relevant cookies
func Login(c *gin.Context) {
	data := &model.User{}

	if err := c.BindJSON(data); err != nil {
		c.JSON(http.StatusNotFound, gin.H{})
		return
	}

	user := GetUserFromEmail(data.Email)

	if user.Id == "" {
		c.JSON(http.StatusNotFound, gin.H{})
		return
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data.Password)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid Credentials"})
		return
	}

	tokenExp := time.Now().Add(time.Hour * 1)
	mc := metaClaims{
		AccountID: user.Id,
		StandardClaims: jwt.StandardClaims{
			Issuer:    user.Id,
			ExpiresAt: tokenExp.Unix(),
		},
	}
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, mc)

	token, err := claims.SignedString([]byte(SigningKey))

	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "could not login"})
		return
	}

	// Set token for usage
	http.SetCookie(c.Writer, &http.Cookie{
		Name:    "token",
		Value:   token,
		Expires: tokenExp,
	})
	c.JSON(http.StatusOK, gin.H{"message": "Login Successfully"})
}

// Authenticate authenticates a user and ensures that they have already logged in
func Authenticate(c *gin.Context) {
	// Get token from cookie
	cookie, err := c.Cookie("token")
	if err != nil {
		if err == http.ErrNoCookie {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}

	// Parse and validate token
	mc := &metaClaims{}
	tkn, err := jwt.ParseWithClaims(cookie, mc, func(token *jwt.Token) (interface{}, error) {
		return []byte(SigningKey), nil
	})
	if err != nil {
		if err == jwt.ErrSignatureInvalid {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		c.AbortWithStatus(http.StatusBadRequest)
		return
	}
	if !tkn.Valid {
		c.AbortWithStatus(http.StatusUnauthorized)
		return
	}

	// Add accountID to context
	c.Set(IdVar, mc.AccountID)
}
