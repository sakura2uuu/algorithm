package searcher

import (
	"bufio"
	"fmt"
	"os"
	"regexp"
)

const (
	CacheFile = `tmp/cache.txt`
)

func Find(input string) (string) {
	pattern := fmt.Sprintf(`\"name\"\:\"%s\"`, input)

	if Numeric(input) {
		pattern = fmt.Sprintf(`\"id\"\:%s,`, input)
	}

	return FindInLine(pattern)
}

func Numeric(input string) (bool) {
	return PatternMatched(input, `^[0-9]*$`)
}

func PatternMatched(input string, pattern string) (bool) {
	matched, _ := regexp.Match(pattern, []byte(input))
	return matched
}

func FindInLine(pattern string) (string) {
	f, _ := os.Open(CacheFile)
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Text()

		if PatternMatched(line, pattern) {
			return line
		}
	}
	return ``
}
