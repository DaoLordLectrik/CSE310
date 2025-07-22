# Go File Watcher
**CSE310 - Applied Programming (GoLang)**  
*Module 1 - First Go Programming Project*

A simple program that watches a file and shows when it changes.

## What It Does

- Monitors `test.txt` for changes
- Shows file size changes in real-time  
- Creates the test file if it doesn't exist
- Updates every second

## How to Run

1. Save the code as `file_watcher.go`
2. Run: `go run file_watcher.go`
3. Edit `test.txt` to see live updates

## Sample Output

```
🚀 Live File Watcher Started!
✅ Created test file: test.txt
🔍 Watching file: test.txt

🔄 [14:23:45] File changed!
   📏 Size: 65 → 85 bytes
   ➕ Added 20 bytes
```

## What I Learned

- Go structs and functions
- File operations with `os` package
- Error handling in Go
- Working with time and loops
- Formatting console output

## Code Structure

- `FileInfo` - stores file details
- `getFileInfo()` - gets file information
- `watchFile()` - monitors for changes
- `main()` - starts the program

---