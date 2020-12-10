-- Initial attempt to create table (will need updates)
-- CREATE TABLE dbo.[User]
-- (
--     UserID INT IDENTITY(1,1) NOT NULL,
--     Email NVARCHAR(254) NOT NULL UNIQUE,
--     PasswordHash BINARY(64) NOT NULL,
--     FirstName NVARCHAR(40) NULL,
--     LastName NVARCHAR(40) NULL,
--     CONSTRAINT [PK_User_UserID] PRIMARY KEY CLUSTERED (UserID ASC)
-- )

-- Initial attempt create procedure for adding users (will need updates)
-- CREATE PROCEDURE dbo.uspAddUser
--     @iEmail NVARCHAR(254),
--     @iPassword NVARCHAR(50),
--     @iFirstName NVARCHAR(40) = NULL,
--     @iLastName NVARCHAR(40) = NULL,
--     @responseMessage NVARCHAR(250) OUTPUT
-- AS
-- BEGIN
--     SET NOCOUNT ON

--     BEGIN TRY

--         INSERT INTO dbo.[User]
--         (Email, PasswordHash, FirstName, LastName)
--     VALUES(@iEmail, HASHBYTES('SHA2_512', @iPassword), @iFirstName, @iLastName)

--         SET @responseMessage='Success'

--     END TRY
--     BEGIN CATCH
--         SET @responseMessage=ERROR_MESSAGE() 
--     END CATCH

-- END

-- Example for adding user
-- DECLARE @responseMessage NVARCHAR(250)

-- EXEC dbo.uspAddUser
--           @iEmail = N'Admin@test.com',
--           @iPassword = N'123',
--           @iFirstName = N'Admin',
--           @iLastName = N'Administrator',
--           @responseMessage=@responseMessage OUTPUT

-- SELECT *
-- FROM [dbo].[User]

-- Updating table to handle salts
-- ALTER TABLE dbo.[User] ADD Salt UNIQUEIDENTIFIER 
-- GO

--Updating add user procedur to handle salts
-- ALTER PROCEDURE dbo.uspAddUser
--     @iEmail NVARCHAR(254),
--     @iPassword NVARCHAR(50),
--     @iFirstName NVARCHAR(40) = NULL,
--     @iLastName NVARCHAR(40) = NULL,
--     @responseMessage NVARCHAR(250) OUTPUT
-- AS
-- BEGIN
--     SET NOCOUNT ON

--     DECLARE @salt UNIQUEIDENTIFIER=NEWID()
--     BEGIN TRY

--         INSERT INTO dbo.[User]
--         (Email, PasswordHash, Salt, FirstName, LastName)
--     VALUES(@iEmail, HASHBYTES('SHA2_512', @iPassword+CAST(@salt AS NVARCHAR(36))), @salt, @iFirstName, @iLastName)

--        SET @responseMessage='Success'

--     END TRY
--     BEGIN CATCH
--         SET @responseMessage=ERROR_MESSAGE() 
--     END CATCH

-- END

-- TRUNCATE TABLE [dbo].[User]

-- Example to add user with Salt
-- DECLARE @responseMessage NVARCHAR(250)

-- EXEC dbo.uspAddUser
--           @iEmail = N'Admin@test.com',
--           @iPassword = N'123',
--           @iFirstName = N'Admin',
--           @iLastName = N'Administrator',
--           @responseMessage=@responseMessage OUTPUT

-- SELECT UserID, Email, PasswordHash, Salt, FirstName, LastName
-- FROM [dbo].[User]

-- Creating a procedure to attempt to log in a user.
-- CREATE PROCEDURE dbo.uspLogin
--     @iEmail NVARCHAR(254),
--     @iPassword NVARCHAR(50),
--     @oResponseMessage NVARCHAR(250)='' OUTPUT,
--     @oEmail NVARCHAR(254)='' OUTPUT,
--     @oFirstName NVARCHAR(254)='' OUTPUT,
--     @oLastName NVARCHAR(254)='' OUTPUT
-- AS
-- BEGIN

--     SET NOCOUNT ON

--     DECLARE @userID INT
--     DECLARE @username NVARCHAR(254)
--     DECLARE @firstName NVARCHAR(254)
--     DECLARE @lastName NVARCHAR(254)

--     IF EXISTS (SELECT TOP 1
--         UserID
--     FROM [dbo].[User]
--     WHERE Email=@iEmail)
--     BEGIN
--         SELECT @userId=UserID, @username=Email, @firstName=FirstName, @lastName=LastName
--         FROM [dbo].[User]
--         WHERE Email=@iEmail AND PasswordHash=HASHBYTES('SHA2_512', @iPassword+CAST(Salt AS NVARCHAR(36)))

--         IF(@userID IS NULL)
--            SET @oResponseMessage='Incorrect password'
--        ELSE 
--            SET @oResponseMessage='User successfully logged in'
--         SET @oEmail=@username
--         SET @oFirstName=@firstName
--         SET @oLastName=@lastName
--     END
--     ELSE
--        SET @oResponseMessage='Invalid login'

-- END

-- DECLARE	@responseMessage nvarchar(250)

-- --Correct login and password
-- EXEC	dbo.uspLogin
-- 		@iEmail = N'Admin',
-- 		@iPassword = N'123',
-- 		@responseMessage = @responseMessage OUTPUT

-- SELECT @responseMessage as N'@responseMessage'

-- --Incorrect login
-- EXEC	dbo.uspLogin
-- 		@iEmail = N'Admin1', 
-- 		@iPassword = N'123',
-- 		@responseMessage = @responseMessage OUTPUT

-- SELECT @responseMessage as N'@responseMessage'

-- --Incorrect password
-- EXEC	dbo.uspLogin
-- 		@iEmail = N'Admin', 
-- 		@iPassword = N'1234',
-- 		@responseMessage = @responseMessage OUTPUT

-- SELECT @responseMessage as N'@responseMessage'


-- CREATE PROCEDURE dbo.uspUpdatePassword
--     @iEmail NVARCHAR(254),
--     @iPassword NVARCHAR(50),
--     @responseMessage NVARCHAR(250) OUTPUT
-- AS
-- BEGIN
--     SET NOCOUNT ON

--     DECLARE @salt UNIQUEIDENTIFIER=NEWID()
--     BEGIN TRY

--         UPDATE dbo.[User]
--             SET PasswordHash = HASHBYTES('SHA2_512', @iPassword+CAST(@salt AS NVARCHAR(36))),
--                 Salt = @salt
--             WHERE Email=@iEmail
--         SET @responseMessage='Success'

--     END TRY
--     BEGIN CATCH
--         SET @responseMessage=ERROR_MESSAGE() 
--     END CATCH

-- END
