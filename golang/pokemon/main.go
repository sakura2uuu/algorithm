package main

import (
	"encoding/json"
	"fmt"
	"strings"

	"github.com/manifoldco/promptui"
	"github.com/sakura2uuu/algorithm/golang/pokemon/lib/searcher"
	"github.com/sakura2uuu/algorithm/golang/pokemon/lib/importer"
)

const (
	InfoColor    = "\033[1;34m%s\033[0m"
	NoticeColor  = "\033[1;36m%s\033[0m"
	WarningColor = "\033[1;33m%s\033[0m"
	ErrorColor   = "\033[1;31m%s\033[0m"
	DebugColor   = "\033[0;36m%s\033[0m"
	ErrorLine				= "\033[1;31m%s\033[0m"
	NestedKeyLine		= "\033[1;36m%s\033[0m"
	KeyLine 				= "\033[1;34m%s\033[0m"
	ValueLine				= "\033[0;36m%s\033[0m"
	InfoLine				= "\033[1;34m%s\033[0m \033[0;36m%s\033[0m"
	InfoLineWithNum = "\033[1;34m%s\033[0m \033[0;36m%v\033[0m"
	DoubleInfoLine	= "\033[1;34m%s\033[0m \033[0;36m%s\033[0m \033[1;34m%s\033[0m \033[0;36m%s\033[0m"
)

type LocationAreaEncounter struct {
	Location	string
	Methods		[]string
}

type Pokemon struct {
	ID											int16
	Name										string
	Types										[]string
	Stats										[]string
	LocationAreaEncounters	[]LocationAreaEncounter
}

func main() {
	importer.Import()

	prompt := promptui.Prompt{
		Label:    "Which Pokemon (ID or name)?",
	}

	value, err := prompt.Run()

	if err != nil {
		fmt.Printf("Prompt failed %v\n", err)
		return
	}

	result := searcher.Find(value)

	if len(result) == 0 {
		fmt.Printf(ErrorLine, "Not found")
		fmt.Println("")
	} else {
		print(result)
	}
}

func print(result string) {
	var pokemon Pokemon
	json.Unmarshal([]byte(result), &pokemon)

	fmt.Printf(InfoLineWithNum, "ID: ", pokemon.ID)
	fmt.Println("")
	fmt.Printf(InfoLine, "Name: ", pokemon.Name)
	fmt.Println("")
	fmt.Printf(InfoLine, "Type: ", strings.Join(pokemon.Types[:], ", "))
	fmt.Println("")
	fmt.Printf(NestedKeyLine, "Encounters")
	fmt.Println("")

	encounters := []LocationAreaEncounter{}
	for _, encounter := range pokemon.LocationAreaEncounters {
		fmt.Println(encounter.Location)
		if strings.HasPrefix(encounter.Location, "kanto-") {
			encounters = append(encounters, encounter)
		}
	}

	if len(encounters) == 0 {
		fmt.Printf(InfoLine, "Location: ", "-")
	} else {
		for _, encounter := range encounters {
			fmt.Printf(DoubleInfoLine, "Location: ", encounter.Location, "Method: ", strings.Join(encounter.Methods[:], ", "))
		}
	}
	fmt.Println("")

	fmt.Printf(KeyLine, "Stats:")
	fmt.Println("")
	fmt.Printf(ValueLine, strings.Join(pokemon.Stats[:], ", "))
	fmt.Println("")
}
