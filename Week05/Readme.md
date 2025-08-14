# Student Grade Analyzer
**CSE310 - Applied Programming (R Project)**  

*A beginner-friendly R program to analyze student grades from a CSV file*  

---

## **📌 Overview**  
This project is a simple **Student Grade Analyzer** written in **R**, designed as beginner software developers learning the basics of R programming. It reads student data from a CSV file, computes averages, assigns letter grades, and displays performance statistics.  

### **🔹 Key Learning Objectives**  
✔ Reading and processing CSV files in R  
✔ Working with **dataframes**, **vectors**, **lists**, and **factors**  
✔ Using **loops** and **conditional checks**  
✔ Basic data manipulation and summary statistics  

---

## **📂 Project Structure**  
```
student-grade-analyzer/  
│── student_grades.csv       # Sample dataset (example CSV file)  
│── student_grade_analyzer.R # Main R script  
│── README.md                # This file  
```

---

## **🛠️ How to Run the Program**  

### **1️⃣ Prerequisites**  
- **R** installed ([Download R](https://cran.r-project.org/))  
- **RStudio** (recommended for beginners) ([Download RStudio](https://www.rstudio.com/products/rstudio/download/))  

### **2️⃣ Running the Program**  
1. **Open RStudio** and load `student_grade_analyzer.R`.  
2. **Place `student_grades.csv` in the same folder** (or specify the full file path when prompted).  
3. **Run the script** (press `Ctrl+Enter` or click *Run*).  
4. **When prompted**, enter the CSV file path (e.g., `student_grades.csv`).  

### **3️⃣ Expected Output**  
The program will display:  
- A full student grade report  
- Class statistics (average, min, max per subject)  
- Top & bottom performers  
- Grade distribution  

---

## **📝 Sample CSV File (`student_grades.csv`)**  
```csv
StudentID,Name,Math,Science,English,History  
101,John Doe,85,92,78,88  
102,Jane Smith,92,95,89,91  
103,Michael Johnson,78,82,85,79  
104,Emily Davis,65,72,68,74  
105,Robert Wilson,88,85,92,90  
```

---

## **📚 Key R Concepts Covered**  

| Concept | Example Usage |  
|---------|--------------|  
| **Dataframes** | `student_data <- read.csv(file_path)` |  
| **Vectors** | `math_scores <- student_data$Math` |  
| **Lists** | `subject_stats <- list(Math = summary(math_scores))` |  
| **Factors** | `student_data$Grade <- cut(...)` |  
| **Loops** | `for (subject in names(subject_stats)) { ... }` |  
| **CSV Handling** | `read.csv()`, `write.csv()` |  

---

## **🚀 Enhancements (For Future Learning)**  
- Add **data validation** (e.g., check if grades are between 0-100).  
- Implement **error handling** for missing files.  
- Export results to a **new CSV file**.  
- Add **visualizations** (bar plots, histograms).  

---

## **📜 License**  
This project is open-source under the **MIT License**.  

---

## **💡 Final Notes**  
This project is designed for **beginners** to get comfortable with:  
✅ **Basic R syntax**  
✅ **Data structures** (dataframes, lists, vectors)  
✅ **File I/O operations** (reading/writing CSV)  
✅ **Basic statistics** (mean, summary, grading)  