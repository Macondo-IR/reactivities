IF OBJECT_ID(N'[__EFMigrationsHistory]') IS NULL
BEGIN
    CREATE TABLE [__EFMigrationsHistory] (
        [MigrationId] nvarchar(150) NOT NULL,
        [ProductVersion] nvarchar(32) NOT NULL,
        CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY ([MigrationId])
    );
END;
GO

BEGIN TRANSACTION;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210507100815_init2')
BEGIN
    CREATE TABLE [Poets] (
        [Id] uniqueidentifier NOT NULL,
        [Name] nvarchar(max) NULL,
        [Description] nvarchar(max) NULL,
        CONSTRAINT [PK_Poets] PRIMARY KEY ([Id])
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210507100815_init2')
BEGIN
    CREATE TABLE [PoetMasterpieces] (
        [Id] uniqueidentifier NOT NULL,
        [PoetId] uniqueidentifier NOT NULL,
        [Title] nvarchar(max) NULL,
        [Url] nvarchar(max) NULL,
        CONSTRAINT [PK_PoetMasterpieces] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_PoetMasterpieces_Poets_PoetId] FOREIGN KEY ([PoetId]) REFERENCES [Poets] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210507100815_init2')
BEGIN
    CREATE TABLE [PoemIndices] (
        [Id] uniqueidentifier NOT NULL,
        [PoetMasterpieceId] uniqueidentifier NOT NULL,
        [PoemIndexId] int NOT NULL,
        [BookId] int NULL,
        [ParentTitle] nvarchar(max) NULL,
        [MainTitle] nvarchar(max) NULL,
        [MainUrl] nvarchar(max) NULL,
        [ParentUrl] nvarchar(max) NULL,
        CONSTRAINT [PK_PoemIndices] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_PoemIndices_PoetMasterpieces_PoetMasterpieceId] FOREIGN KEY ([PoetMasterpieceId]) REFERENCES [PoetMasterpieces] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210507100815_init2')
BEGIN
    CREATE TABLE [Poems] (
        [Id] uniqueidentifier NOT NULL,
        [PoemIndexId] uniqueidentifier NOT NULL,
        [SortId] int NOT NULL,
        [PoemId] int NULL,
        [Vorder] int NULL,
        [Position] int NULL,
        [Text] nvarchar(max) NULL,
        CONSTRAINT [PK_Poems] PRIMARY KEY ([Id]),
        CONSTRAINT [FK_Poems_PoemIndices_PoemIndexId] FOREIGN KEY ([PoemIndexId]) REFERENCES [PoemIndices] ([Id]) ON DELETE CASCADE
    );
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210507100815_init2')
BEGIN
    CREATE INDEX [IX_PoemIndices_PoetMasterpieceId] ON [PoemIndices] ([PoetMasterpieceId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210507100815_init2')
BEGIN
    CREATE INDEX [IX_Poems_PoemIndexId] ON [Poems] ([PoemIndexId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210507100815_init2')
BEGIN
    CREATE INDEX [IX_PoetMasterpieces_PoetId] ON [PoetMasterpieces] ([PoetId]);
END;
GO

IF NOT EXISTS(SELECT * FROM [__EFMigrationsHistory] WHERE [MigrationId] = N'20210507100815_init2')
BEGIN
    INSERT INTO [__EFMigrationsHistory] ([MigrationId], [ProductVersion])
    VALUES (N'20210507100815_init2', N'5.0.5');
END;
GO

COMMIT;
GO

