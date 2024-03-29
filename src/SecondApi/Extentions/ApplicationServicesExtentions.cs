﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Configuration;
using Microsoft.OpenApi.Models;
using Persistence;
using Microsoft.EntityFrameworkCore;
using MediatR;
using Application.Core;

namespace SecondApi.Extentions
{
    public  static class ApplicationServicesExtentions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services,IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "API", Version = "v1" });
            });

            services.AddDbContext<DataContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });
            services.AddDbContext<PoemContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("PoemConnection"));
            });
            services.AddDbContext<SimpleSbssContext>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("SimpleSbssConnection"));
            });  
            services.AddDbContext<Qeraat2Context>(opt =>
            {
                opt.UseSqlServer(config.GetConnectionString("Qeraat2Connection"));
            });
            //services.AddMediatR(Assembly.GetExecutingAssembly());

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });
            });
            services.AddMediatR(typeof(Application.Activities.List.Handler).Assembly);
            services.AddMediatR(typeof(Application.Contacts.List.Handler).Assembly);
            services.AddMediatR(typeof(Application.Poets.List.Handler).Assembly);
            services.AddMediatR(typeof(Application.UserContacts.List.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            return services;
        }
    }
}
