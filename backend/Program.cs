using Bookstore.API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register API controllers for controller-based endpoints.
builder.Services.AddControllers();

// OpenAPI for local API inspection.
builder.Services.AddOpenApi();

// Register DbContext with SQLite connection from appsettings.json.
builder.Services.AddDbContext<BookstoreContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("BookstoreConnection")));

// Dev: HTTP only, no HTTPS redirect — avoids cert prompts on phones / other devices on the LAN.
// Any origin in Development so http://<your-LAN-IP>:3000 works without listing every device.
builder.Services.AddCors(options =>
    options.AddPolicy("AllowReactApp",
    policy => {
        policy.WithOrigins("http://localhost:3000", "https://zealous-sky-005345f10.2.azurestaticapps.net")
            .AllowAnyMethod()
            .AllowAnyHeader();
    }));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseCors("AllowReactApp");

app.MapControllers();

app.Run();