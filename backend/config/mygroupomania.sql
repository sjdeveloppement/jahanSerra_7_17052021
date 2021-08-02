-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  lun. 02 août 2021 à 08:14
-- Version du serveur :  8.0.18
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `mygroupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `appreciation`
--

DROP TABLE IF EXISTS `appreciation`;
CREATE TABLE IF NOT EXISTS `appreciation` (
  `appreciation_id` int(11) NOT NULL AUTO_INCREMENT,
  `message_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `appreciation_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`appreciation_id`),
  KEY `message_id` (`message_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=140 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `appreciation`
--

INSERT INTO `appreciation` (`appreciation_id`, `message_id`, `user_id`, `appreciation_date`) VALUES
(135, 193, 37, '2021-07-30 15:08:10'),
(136, 195, 14, '2021-07-30 15:17:16'),
(137, 195, 55, '2021-07-30 15:18:17'),
(138, 196, 15, '2021-07-30 15:19:34');

-- --------------------------------------------------------

--
-- Structure de la table `comment`
--

DROP TABLE IF EXISTS `comment`;
CREATE TABLE IF NOT EXISTS `comment` (
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message_id` int(11) NOT NULL,
  `comment_content` varchar(255) NOT NULL,
  PRIMARY KEY (`comment_id`),
  KEY `user_id` (`user_id`),
  KEY `message_id` (`message_id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comment`
--

INSERT INTO `comment` (`comment_id`, `user_id`, `message_id`, `comment_content`) VALUES
(33, 37, 193, 'Salut à tous c\'est cool cette application web'),
(34, 34, 194, 'Vous aimez ?'),
(35, 36, 194, 'J\'aime les bonbons Ricola'),
(36, 15, 196, 'Bonjour à toi tu peux mettre une image  de profil plus sympa si tu veux !');

-- --------------------------------------------------------

--
-- Structure de la table `message`
--

DROP TABLE IF EXISTS `message`;
CREATE TABLE IF NOT EXISTS `message` (
  `message_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `message_title` varchar(255) NOT NULL,
  `message_content` varchar(255) NOT NULL,
  `message_image` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `message_appreciation` int(11) NOT NULL DEFAULT '0',
  `message_createdat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `message_updateat` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`message_id`),
  KEY `user_id` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `message`
--

INSERT INTO `message` (`message_id`, `user_id`, `message_title`, `message_content`, `message_image`, `message_appreciation`, `message_createdat`, `message_updateat`) VALUES
(193, 15, 'Hello voici Mygroupomania', 'je suis votre admin et je vous souhaite la bienvenue !', 'http://localhost:3000/images/lion_1627650225419.jpg', 1, '2021-07-30 15:03:45', '2021-07-30 15:03:45'),
(194, 34, 'miam', 'Belles tomates !', 'http://localhost:3000/images/tomatoes_1627650685671.jpg', 0, '2021-07-30 15:11:25', '2021-07-30 15:11:25'),
(195, 14, 'Mes vacances', 'la Polynésie ', 'http://localhost:3000/images/polynesia_1627651029069.jpg', 2, '2021-07-30 15:17:09', '2021-07-30 15:17:09'),
(196, 55, 'Coucou c\'est moi Violette', 'Je suis la stagiaire', '', 1, '2021-07-30 15:19:00', '2021-07-30 15:19:00');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `user_pseudo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `user_mail` varchar(255) NOT NULL,
  `user_password` varchar(255) NOT NULL,
  `user_image` varchar(255) NOT NULL,
  `user_isadmin` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_mail` (`user_mail`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=56 DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`user_id`, `user_pseudo`, `user_mail`, `user_password`, `user_image`, `user_isadmin`) VALUES
(1, 'Jean', 'jean@gmail.com', '$2b$10$ffmDxdwUrQvP8d4ACoArEeQulJxZBDMEjce2fsR2tHQHDfG1wXDAa', 'http://localhost:3000/images/Arbouses-mûres_1627145559181.jpg', 0),
(2, 'michou', 'michel@test.com', 'Azerty12345!', '', 0),
(14, 'Greg', 'greg@gmail.com', '$2b$10$5QpdqkN7RzsLZZA6VtBf4eZDB39upfXkD/ZE/ybk6TOHPdKRiqgvy', 'http://localhost:3000/images/champ_1627650932375.png', 0),
(15, 'yves', 'yves@gmail.com', '$2b$10$VeUy0/E3LMTbRQeX1S5LxeXU4pxUaqrHh7/u/NLM4z5Wu3uKenibG', 'http://localhost:3000/images/lion_1627650314119.jpg', 1),
(17, 'tom', 'tom@gmail.com', '$2b$10$eRGIWUYOrXAgiCpUqrca.e.tUvflepsbIWYphOy7dHMUT7GvdfhoO', 'http://localhost:3000/images/user.default.png', 0),
(25, 'adminGroupomania', 'adminGroupomania@gmail.com', '$2b$10$xOTUjjRjYj6MA8GIIZNNIug9Lcl2OsTl7cihf1hpCPoHMvAqCu/.m', 'http://localhost:3000/images/user.default.png', 1),
(33, 'hugo', 'hugo@gmail.com', '$2b$10$Kzq3hPX0I.W.EdBouUGTauBqg9z5gm544CGtSwI.r0R1pfGOxBciy', 'http://localhost:3000/images/balisehtml_1627333417631.png', 0),
(34, 'mark', 'mark@gmail.com', '$2b$10$OqiAORmHcdZbXWj9yFLFk.G4rPCRAQZVKj8S01w587jURL95B8YPS', 'http://localhost:3000/images/rabbit_1627650645825.jpg', 0),
(36, 'kamel', 'kamel@gmail.com', '$2b$10$yf3u9NZDRC/kfl3NzI8RF.pH2s.kiew/IX/vCqi/2PT8vkHZ4aX.S', 'http://localhost:3000/images/candy_1627650811175.jpg', 0),
(37, 'momoChe', 'momo@gmail.com', '$2b$10$/BKdIiibc2PpU2lwbhicQOsd4aO3xbyQQA8qye5Y/M/ytF6iCEXcC', 'http://localhost:3000/images/cat_1627650480158.png', 0),
(50, 'tiri', 'tiri@gmail.com', '$2b$10$EFu6Rsfl8LyC0oqO1hRKLeUC.bwWAd71pKYSvu5QKJh71R2vYtxcq', 'http://localhost:3000/images/171632756_288931869390157_6868397184196476002_n_1627380747557.jpg', 0),
(51, 'ondeletecascadetest', 'ondelete@gmail.com', '$2b$10$Dyg1zsLaIej3.h4NHy772OpORcMyJ00gKd64SnrGYkjKEJ699aWMS', 'http://localhost:3000/images/baguette-1743939_1920_1627391623004.jpg', 0),
(52, 'Montaigne', 'mboland@gmail.com', '$2b$10$3lbCkmyZ9JP23Qa2M55fQ.oC0VjcwHkupGYQTWiWlWk1sk.A.jxxO', 'http://localhost:3000/images/user.default.png', 0),
(53, 'Mimissicu', 'm.borfand@esc-montpellier.com', '$2b$10$WQxSkqnTSwjgh.AZ0VvsSet2s9c1OhJz4JRnYTagCW7SEHzrsIjMC', 'http://localhost:3000/images/user.default.png', 0),
(54, 'herbert', 'herbert@gmail.com', '$2b$10$IaszyM1s8skZPHzlpp1iZ.XWLVzN1z.zooLmecnkidV1AsIdabe/O', 'images/users-icon-defaut_2098__873_640_1627480267898.png', 0),
(55, 'violette', 'violette@gmail.com', '$2b$10$DHEQbFVkxPjsn4bsStTt0e8wQQ//yA.0N9KaRJUqWBQANu4Ar78v2', 'http://localhost:3000/images/users-icon-defaut_2098__873_640_1627480267898.png', 0);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `appreciation`
--
ALTER TABLE `appreciation`
  ADD CONSTRAINT `appreciation_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `appreciation_ibfk_2` FOREIGN KEY (`message_id`) REFERENCES `message` (`message_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Contraintes pour la table `comment`
--
ALTER TABLE `comment`
  ADD CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  ADD CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`message_id`) REFERENCES `message` (`message_id`) ON DELETE CASCADE ON UPDATE RESTRICT;

--
-- Contraintes pour la table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
