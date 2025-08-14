# Student Grade Analyzer
# This program reads student data from a CSV file and performs grade analysis

# Load necessary libraries
library(tools)
library(utils)

# Function to display a formatted header
display_header <- function(title) {
  cat("\n", rep("=", 50), "\n", sep = "")
  cat(title, "\n")
  cat(rep("=", 50), "\n\n", sep = "")
}

# Main program
student_grade_analyzer <- function() {
  # Request CSV file path from user
  file_path <- readline(prompt = "Enter the path to the student grades CSV file: ")
  
  # Verify file exists and is CSV
  if (!file.exists(file_path)) {
    stop("File not found. Please check the path and try again.")
  }
  
  if (file_ext(file_path) != "csv") {
    stop("The file must be a CSV file.")
  }
  
  # Read the CSV file into a dataframe (requirement: Use Dataframes, Incorporate CSV file)
  student_data <- tryCatch(
    {
      read.csv(file_path, stringsAsFactors = FALSE)
    },
    error = function(e) {
      stop("Error reading the CSV file. Please check the file format.")
    }
  )
  
  # Check if required columns exist
  required_cols <- c("StudentID", "Name", "Math", "Science", "English", "History")
  if (!all(required_cols %in% colnames(student_data))) {
    missing_cols <- setdiff(required_cols, colnames(student_data))
    stop(paste("Missing required columns in CSV file:", paste(missing_cols, collapse = ", ")))
  }
  
  # Convert grades to numeric (they might be read as character)
  grade_cols <- c("Math", "Science", "English", "History")
  student_data[grade_cols] <- lapply(student_data[grade_cols], as.numeric)
  
  # Calculate additional metrics
  student_data$Average <- rowMeans(student_data[grade_cols], na.rm = TRUE)
  student_data$Grade <- cut(student_data$Average,
                           breaks = c(0, 60, 70, 80, 90, 100),
                           labels = c("F", "D", "C", "B", "A"),
                           right = FALSE)
  
  # Display analysis results
  
  # 1. Show all student data
  display_header("STUDENT GRADE REPORT")
  print(student_data)
  
  # 2. Show class statistics (requirement: Use at least 5 different R datatypes)
  display_header("CLASS STATISTICS")
  
  # Different data types:
  # 1. Numeric vector
  math_scores <- student_data$Math
  # 2. Character vector
  student_names <- student_data$Name
  # 3. Factor
  grade_levels <- student_data$Grade
  # 4. List
  subject_stats <- list(
    Math = summary(math_scores),
    Science = summary(student_data$Science),
    English = summary(student_data$English),
    History = summary(student_data$History)
  )
  # 5. Dataframe (already using student_data)
  
  # Print subject statistics (requirement: Incorporate at least one loop)
  for (subject in names(subject_stats)) {
    cat("\n", subject, "Scores:\n")
    print(subject_stats[[subject]])
    cat("\n")
  }
  
  # 3. Show top and bottom performers
  display_header("TOP PERFORMERS")
  top_students <- student_data[order(-student_data$Average), ][1:3, ]
  print(top_students[, c("Name", "Average", "Grade")])
  
  display_header("BOTTOM PERFORMERS")
  bottom_students <- student_data[order(student_data$Average), ][1:3, ]
  print(bottom_students[, c("Name", "Average", "Grade")])
  
  # 4. Grade distribution
  display_header("GRADE DISTRIBUTION")
  grade_dist <- table(student_data$Grade)
  print(grade_dist)
  
  # Plot grade distribution (bonus visualization)
  if (requireNamespace("ggplot2", quietly = TRUE)) {
    library(ggplot2)
    p <- ggplot(student_data, aes(x = Grade, fill = Grade)) +
      geom_bar() +
      labs(title = "Grade Distribution", x = "Letter Grade", y = "Number of Students") +
      theme_minimal()
    print(p)
  } else {
    cat("\nInstall ggplot2 package for visual grade distribution.\n")
  }
  
  # Return the analyzed data invisibly
  invisible(student_data)
}

# Run the program
student_grade_analyzer()
