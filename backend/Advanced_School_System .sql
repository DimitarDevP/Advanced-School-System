-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Apr 21, 2020 at 07:18 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `Advanced_School_System`
--

-- --------------------------------------------------------

--
-- Table structure for table `abscences`
--

CREATE TABLE `abscences` (
  `absence_id` int(16) NOT NULL,
  `student_id` int(16) NOT NULL,
  `_status` varchar(32) NOT NULL,
  `_description` varchar(256) NOT NULL,
  `_date` varchar(16) NOT NULL,
  `_period` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `abscences`
--

INSERT INTO `abscences` (`absence_id`, `student_id`, `_status`, `_description`, `_date`, `_period`) VALUES
(2, 7, 'Approved', 'Student was late for class but arrived.', '2020-25-03', 2),
(3, 7, 'Approved', 'Student was late for class but arrived.', '2020-25-03', 1),
(4, 7, 'Pending', 'Student was late for class', '2020-25-03', 3),
(5, 7, 'Pending', 'Student was late for class', '2020-26-03', 3),
(6, 9, 'Pending', 'Student was late for class', '2020-26-03', 3),
(7, 9, 'Approved', 'Student left early to go to hospital', '2020-26-03', 7);

-- --------------------------------------------------------

--
-- Table structure for table `assignments`
--

CREATE TABLE `assignments` (
  `assignment_id` int(16) NOT NULL,
  `creator_id` int(16) NOT NULL,
  `assignment_name` varchar(256) NOT NULL,
  `assignemnt_description` text NOT NULL,
  `assignment_status` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignments`
--

INSERT INTO `assignments` (`assignment_id`, `creator_id`, `assignment_name`, `assignemnt_description`, `assignment_status`) VALUES
(1, 6, 'Zadaca vo asembler.', 'Da se napravi programa so koja ke se soberat 2 broevi koi se naogaat vo memorija, da se proveri parnosta na nivnata suma (vo dekadna vrednost). Ako e parna, da se zacuva sumata na adresa 1234, ako ne e parna da se zacuva na adresa 4321. ', 'Opened');

-- --------------------------------------------------------

--
-- Table structure for table `assignment_submissions`
--

CREATE TABLE `assignment_submissions` (
  `submission_id` int(16) NOT NULL,
  `submitter_id` int(16) NOT NULL,
  `assignment_id` int(16) NOT NULL,
  `submission_file` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `assignment_submissions`
--

INSERT INTO `assignment_submissions` (`submission_id`, `submitter_id`, `assignment_id`, `submission_file`) VALUES
(3, 10, 1, '/public/assignments/student_10_assignemnt_1_submission.sh');

-- --------------------------------------------------------

--
-- Table structure for table `classes`
--

CREATE TABLE `classes` (
  `class_id` int(16) NOT NULL,
  `professor_id` int(16) NOT NULL,
  `grade` int(1) NOT NULL,
  `class` int(2) NOT NULL,
  `_year` int(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `classes`
--

INSERT INTO `classes` (`class_id`, `professor_id`, `grade`, `class`, `_year`) VALUES
(1, 8, 4, 5, 2016),
(2, 6, 1, 5, 2020);

-- --------------------------------------------------------

--
-- Table structure for table `enrolled_classes`
--

CREATE TABLE `enrolled_classes` (
  `student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enrolled_classes`
--

INSERT INTO `enrolled_classes` (`student_id`, `class_id`) VALUES
(7, 1),
(9, 1),
(10, 2);

-- --------------------------------------------------------

--
-- Table structure for table `enrolled_subjects`
--

CREATE TABLE `enrolled_subjects` (
  `enroll_id` int(16) NOT NULL,
  `subject_id` int(16) NOT NULL,
  `student_id` int(16) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `enrolled_subjects`
--

INSERT INTO `enrolled_subjects` (`enroll_id`, `subject_id`, `student_id`) VALUES
(1, 1, 7);

-- --------------------------------------------------------

--
-- Table structure for table `marks`
--

CREATE TABLE `marks` (
  `mark_id` int(16) NOT NULL,
  `student_id` int(16) NOT NULL,
  `subject_id` int(16) NOT NULL,
  `quarter` int(1) NOT NULL,
  `_value` int(1) NOT NULL,
  `_type` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `marks`
--

INSERT INTO `marks` (`mark_id`, `student_id`, `subject_id`, `quarter`, `_value`, `_type`) VALUES
(1, 10, 1, 3, 5, 'Usno');

-- --------------------------------------------------------

--
-- Table structure for table `subjects`
--

CREATE TABLE `subjects` (
  `subject_id` int(16) NOT NULL,
  `professor_id` int(16) NOT NULL,
  `subject_name` varchar(64) NOT NULL,
  `subject_description` varchar(256) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subjects`
--

INSERT INTO `subjects` (`subject_id`, `professor_id`, `subject_name`, `subject_description`) VALUES
(1, 6, 'Digitalna Elektronika za IV Godina', 'Arhitektura na opst mikroprocesor, arhitektura na 8085, asemblerski komandi vo 8085, arduino mikrokontroler...');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` int(16) NOT NULL,
  `user_role` varchar(32) NOT NULL,
  `firstname` varchar(64) NOT NULL,
  `lastname` varchar(64) NOT NULL,
  `email` varchar(256) NOT NULL,
  `_password` varchar(512) NOT NULL,
  `verified` tinyint(1) NOT NULL,
  `phone_number` varchar(32) NOT NULL,
  `sex` varchar(16) NOT NULL,
  `birth_date` date NOT NULL,
  `parent_name` varchar(64) NOT NULL,
  `parent_lastname` varchar(64) NOT NULL,
  `parent_phone` varchar(32) NOT NULL,
  `present_status` varchar(32) NOT NULL,
  `salary` int(16) NOT NULL,
  `profile_picture` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `user_role`, `firstname`, `lastname`, `email`, `_password`, `verified`, `phone_number`, `sex`, `birth_date`, `parent_name`, `parent_lastname`, `parent_phone`, `present_status`, `salary`, `profile_picture`) VALUES
(6, 'Professor', 'Jani', 'Servini', 'serjani@yahoo.com', 'janipass', 1, '123456789', 'male', '1959-01-06', 'None', 'None', 'None', 'Present', 25000, '/public/default.png'),
(7, 'Student', 'Dimitar', 'Veljanovski', 'dimitardev1@gmail.com', 'dimopass', 1, '078398450', 'male', '2001-01-03', 'Zlatko', 'Veljanovski', '078358420', 'Present', 0, '/public/default.png'),
(8, 'Professor', 'Lidija', 'Stefanovska', 'lidijastef@gmail.com', 'klasnapass', 0, '123456879', 'female', '1975-05-04', '', '', '', 'Present', 25000, '/public/default.png'),
(9, 'Student', 'Filip', 'Dzajkov', 'fdzajkov@digitalcentar.com', 'filippass', 0, '254876692', 'male', '2001-07-02', 'Dzajko', 'Dzajkov', '123458796', 'Present', 0, '/public/default.png'),
(10, 'Student', 'Dimitar', 'Veljanovski', 'dimitarveljanovski1@gmail.com', 'dimopass2', 0, '157842936', 'male', '2004-03-01', 'Zlatko', 'Veljanovski', '587469132', 'Present', 0, '/public/default.png'),
(43, 'Student', 'Dimitar', 'Veljanovski', 'dimitarschool@gmail.com', 'dimopass3', 1, '078398450987', 'male', '2001-03-01', 'Zlatko', 'Veljanovski', '985637421', 'Present', 0, '/public/profile_pictures/default.png');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `abscences`
--
ALTER TABLE `abscences`
  ADD PRIMARY KEY (`absence_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `assignments`
--
ALTER TABLE `assignments`
  ADD PRIMARY KEY (`assignment_id`),
  ADD KEY `creator_id` (`creator_id`);

--
-- Indexes for table `assignment_submissions`
--
ALTER TABLE `assignment_submissions`
  ADD PRIMARY KEY (`submission_id`),
  ADD KEY `assignment_id` (`assignment_id`),
  ADD KEY `submitter_id` (`submitter_id`);

--
-- Indexes for table `classes`
--
ALTER TABLE `classes`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `professor_id` (`professor_id`);

--
-- Indexes for table `enrolled_classes`
--
ALTER TABLE `enrolled_classes`
  ADD KEY `class_id` (`class_id`),
  ADD KEY `student_id` (`student_id`);

--
-- Indexes for table `enrolled_subjects`
--
ALTER TABLE `enrolled_subjects`
  ADD PRIMARY KEY (`enroll_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexes for table `marks`
--
ALTER TABLE `marks`
  ADD PRIMARY KEY (`mark_id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexes for table `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`subject_id`),
  ADD KEY `professor_id` (`professor_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `abscences`
--
ALTER TABLE `abscences`
  MODIFY `absence_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `assignments`
--
ALTER TABLE `assignments`
  MODIFY `assignment_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `assignment_submissions`
--
ALTER TABLE `assignment_submissions`
  MODIFY `submission_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `classes`
--
ALTER TABLE `classes`
  MODIFY `class_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `enrolled_subjects`
--
ALTER TABLE `enrolled_subjects`
  MODIFY `enroll_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `marks`
--
ALTER TABLE `marks`
  MODIFY `mark_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subjects`
--
ALTER TABLE `subjects`
  MODIFY `subject_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` int(16) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=44;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `abscences`
--
ALTER TABLE `abscences`
  ADD CONSTRAINT `abscences_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `assignments`
--
ALTER TABLE `assignments`
  ADD CONSTRAINT `assignments_ibfk_1` FOREIGN KEY (`creator_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `assignment_submissions`
--
ALTER TABLE `assignment_submissions`
  ADD CONSTRAINT `assignment_submissions_ibfk_1` FOREIGN KEY (`assignment_id`) REFERENCES `assignments` (`assignment_id`),
  ADD CONSTRAINT `assignment_submissions_ibfk_2` FOREIGN KEY (`submitter_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `classes`
--
ALTER TABLE `classes`
  ADD CONSTRAINT `classes_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `enrolled_classes`
--
ALTER TABLE `enrolled_classes`
  ADD CONSTRAINT `enrolled_classes_ibfk_1` FOREIGN KEY (`class_id`) REFERENCES `classes` (`class_id`),
  ADD CONSTRAINT `enrolled_classes_ibfk_2` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`);

--
-- Constraints for table `enrolled_subjects`
--
ALTER TABLE `enrolled_subjects`
  ADD CONSTRAINT `enrolled_subjects_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `enrolled_subjects_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`);

--
-- Constraints for table `marks`
--
ALTER TABLE `marks`
  ADD CONSTRAINT `marks_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `marks_ibfk_2` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`subject_id`);

--
-- Constraints for table `subjects`
--
ALTER TABLE `subjects`
  ADD CONSTRAINT `subjects_ibfk_1` FOREIGN KEY (`professor_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
