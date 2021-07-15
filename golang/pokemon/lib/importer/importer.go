package importer

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
)

const (
	BASE_URL = `https://pokeapi.co/api/v2/pokemon?limit=2000`
	CacheFile = `tmp/cache.txt`
)

type Data struct {
	Name string
	URL string
}

type Response struct  {
	Count int16
	Next	string
	Previous string
	Results []Data
}

func Import() {
	urls := GetPokemonURLs()
	data := GetPokemon(urls)
	fmt.Println(data)
}

func GetPokemon([]string) ([]string) {

	
}

func GetPokemonURLs() ([]string) {
	results := []Data{}
	response := FetchData(BASE_URL)

	for (response.Next != "") {
		results = append(results, response.Results...)
		response = FetchData(response.Next)
	}
	results = append(results, response.Results...)

	urls := []string{}
	for _, data := range results {
		urls = append(urls, data.URL)
	}
	return urls
}

func FetchData(url string) (Response) {
	var response Response

	resp, err := http.Get(url)
	if err != nil {
		// handle error
	}
	defer resp.Body.Close()
	body, err := io.ReadAll(resp.Body)

	json.Unmarshal(body, &response)
	return response
}
