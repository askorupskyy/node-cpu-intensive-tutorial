package main

import (
  "fmt"
	"time"
)

func main() {
  var sum uint64 = 0
	var i uint64
	start := time.Now()
	for i = 0; i < 999999999; i++ {
		sum += i
	}
	t := time.Now()
	elapsed := (float64)(t.Sub(start)) / (float64)(time.Second)
	fmt.Printf("%d\n", sum)
	fmt.Printf("time: %f seconds", elapsed)
}