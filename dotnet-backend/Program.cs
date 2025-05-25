using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;


var builder = WebApplication.CreateBuilder(args);

// 1) Define a CORS policy
builder.Services.AddCors(o => o.AddPolicy("AllowReact", policy =>
{
    policy
      .WithOrigins("http://localhost:3000")
      .AllowAnyHeader()
      .AllowAnyMethod();
}));

builder.Services.AddEndpointsApiExplorer();

// 2) Build
var app = builder.Build();

// 3) Use the policy
app.UseCors("AllowReact");

app.MapGet("/echo", (string? message) => {
    var result = new
    {
        Timestamp = DateTime.UtcNow,
        Payload = message ?? "hello"
    };
    return Results.Json(result);
});

app.MapGet("/compute", (int? work) => {
    var iterations = work ?? 1_000_000;
    double x = 0;
    for (int i = 0; i < iterations; i++) x += Math.Sqrt(i);
    return Results.Json(new { Result = x });
});

app.Run("http://localhost:3002");

