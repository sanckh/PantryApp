package store

import (
	"fmt"
	"net/http"
	"time"

	jwt "github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	"github.com/sanckh/PantryApp/backend/model"
	"golang.org/x/crypto/bcrypt"
)

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
		Email:    data.Email,
		Password: password,
	}

	// Mock for now
	allUsers = append(allUsers, &user)

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

	pantryID := data.Id
	user := &model.User{}
	for _, u := range allUsers {
		if u.Id == pantryID {
			user = u
		}
	}

	if pantryID == "" {
		c.JSON(http.StatusNotFound, gin.H{})
		return
	}

	if err := bcrypt.CompareHashAndPassword(user.Password, []byte(data.Password)); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "Invalid Credentials"})
		return
	}

	tokenExp := time.Now().Add(time.Hour * 1)
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user.Id,
		ExpiresAt: tokenExp.Unix(),
	})

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
	fmt.Println("cookie set")
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
	tkn, err := jwt.Parse(cookie, func(token *jwt.Token) (interface{}, error) {
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
}
