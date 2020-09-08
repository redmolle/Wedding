IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200908215327_InitMigration')
BEGIN
    CREATE TABLE [Category] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NULL,
        [SortOrder] int NOT NULL IDENTITY,
        CONSTRAINT [PK_Category] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200908215327_InitMigration')
BEGIN
    CREATE TABLE [Guest] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NULL,
        [Message] nvarchar(max) NULL,
        [IsConfirmedIvite] bit NOT NULL,
        [IsCanBeInZAGS] bit NOT NULL,
        [IsConfirmedZAGS] bit NOT NULL,
        CONSTRAINT [PK_Guest] PRIMARY KEY ([Id])
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200908215327_InitMigration')
BEGIN
    CREATE TABLE [Dish] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NULL,
        [CategoryId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_Dish] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Dish_Category_CategoryId] FOREIGN KEY ([CategoryId]) REFERENCES [Category] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200908215327_InitMigration')
BEGIN
    CREATE TABLE [Meal] (
        [Id] uniqueidentifier NOT NULL,
        [GuestId] uniqueidentifier NOT NULL,
        [DishId] uniqueidentifier NOT NULL,
        CONSTRAINT [PK_Meal] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Meal_Dish_DishId] FOREIGN KEY ([DishId]) REFERENCES [Dish] ([Id]) ON DELETE CASCADE,
        CONSTRAINT [FK_Meal_Guest_GuestId] FOREIGN KEY ([GuestId]) REFERENCES [Guest] ([Id]) ON DELETE CASCADE
    );
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200908215327_InitMigration')
BEGIN
    CREATE INDEX [IX_Dish_CategoryId] ON [Dish] ([CategoryId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200908215327_InitMigration')
BEGIN
    CREATE INDEX [IX_Meal_DishId] ON [Meal] ([DishId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200908215327_InitMigration')
BEGIN
    CREATE UNIQUE INDEX [IX_Meal_GuestId] ON [Meal] ([GuestId]);
END;

GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20200908215327_InitMigration')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20200908215327_InitMigration', N'3.1.8');
END;

GO

