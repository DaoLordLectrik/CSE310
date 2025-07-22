package main

import (
	"fmt"
	"log"
	"os"
	"time"
)

func main() {
	fmt.Println("🚀 Simple File Watcher Started!")
	fmt.Println("================================")

	// Create test file
	filename := "test.txt"

	// Create the file with initial content
	err := os.WriteFile(filename, []byte("Hello World!\nEdit this file to see changes!\n"), 0644)
	if err != nil {
		log.Fatal("Error creating file:", err)
	}
	fmt.Printf("✅ Created test file: %s\n", filename)
	fmt.Println("🔍 Watching for changes...")

	// Get initial file info
	initialInfo, err := os.Stat(filename)
	if err != nil {
		log.Fatal("Error reading file:", err)
	}
	lastModTime := initialInfo.ModTime()
	lastSize := initialInfo.Size()

	fmt.Printf("📁 Initial: %s (%d bytes)\n", filename, lastSize)

	// Watch loop
	for {
		time.Sleep(1 * time.Second)

		// Check file info
		currentInfo, err := os.Stat(filename)
		if err != nil {
			fmt.Printf("❌ Error: %v\n", err)
			continue
		}

		currentModTime := currentInfo.ModTime()
		currentSize := currentInfo.Size()

		// Check if file changed
		if currentModTime != lastModTime {
			fmt.Printf("\n🔄 [%s] FILE CHANGED!\n", time.Now().Format("15:04:05"))
			fmt.Printf("   📏 Size: %d → %d bytes\n", lastSize, currentSize)

			if currentSize > lastSize {
				fmt.Printf("   ➕ Added %d bytes\n", currentSize-lastSize)
			} else if currentSize < lastSize {
				fmt.Printf("   ➖ Removed %d bytes\n", lastSize-currentSize)
			} else {
				fmt.Printf("   📝 Content modified (same size)\n")
			}

			// Update tracking variables
			lastModTime = currentModTime
			lastSize = currentSize
		}
	}
}
