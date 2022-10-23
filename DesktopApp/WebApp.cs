namespace MeeKaraoke;

using System;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;

public class WebApp
{
    public static bool StartWwwRootServer = false;
    public static WebApplication Start(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("CorsPolicy", policyBuilder => policyBuilder
                        .AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
        });
        builder.WebHost.UseUrls(new string[] { "http://localhost:5000" });

        var app = builder.Build();

        // Configure the HTTP request pipeline.
        app.UseSwagger();
        app.UseSwaggerUI();
        app.MapControllers();
        var repo = new SongRepository();

        app.UseCors("CorsPolicy");
        app.UseAuthorization();
        app.UseStaticFiles(new StaticFileOptions
        {
            FileProvider = new PhysicalFileProvider(
                repo.AppDirectory
            ),
            RequestPath = "/Static",
            ServeUnknownFileTypes = true,
            OnPrepareResponse = ctx =>
            {
                ctx.Context.Response.Headers.Append(new KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>("Access-Control-Allow-Origin", "*"));
                ctx.Context.Response.Headers.Append(new KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>("Access-Control-Allow-Methods", "*"));
                ctx.Context.Response.Headers.Append(new KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>("Access-Control-Allow-Headers",
                  "Origin, X-Requested-With, Content-Type, Accept"));
            },
        });

        if (StartWwwRootServer)
        {
            Directory.SetCurrentDirectory(System.AppDomain.CurrentDomain.BaseDirectory);
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                System.IO.Path.Combine(System.IO.Directory.GetCurrentDirectory(), "wwwroot")
            ),
                RequestPath = "/app",
                ServeUnknownFileTypes = true,
                OnPrepareResponse = ctx =>
                {
                    ctx.Context.Response.Headers.Append(new KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>("Access-Control-Allow-Origin", "*"));
                    ctx.Context.Response.Headers.Append(new KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>("Access-Control-Allow-Methods", "*"));
                    ctx.Context.Response.Headers.Append(new KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>("Access-Control-Allow-Headers",
                      "Origin, X-Requested-With, Content-Type, Accept"));
                },
            });
        }

        app.Start();

        return app;

    }
}