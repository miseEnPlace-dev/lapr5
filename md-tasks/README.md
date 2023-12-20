# MD Tasks API

## Architecture

This project is based on the ONION architecture. The REST API is built using ASP.NET Core 5.0 and Entity Framework Core 5.0.

## For Developers

Install package dotnet-ef

```bash
dotnet tool install dotnet-ef --version 7.0.0`
```

Creating a migration:

```bash
dotnet ef migrations add NAME
```

Updating the database:

```bash
dotnet ef database update
```
