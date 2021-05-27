using Domain;
using Domain.Qeraat2;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace Persistence
{
    public class Qeraat2Context : IdentityDbContext<AppUser>
    {
        public Qeraat2Context( DbContextOptions<Qeraat2Context> options) : base(options)
        {
        }
        public DbSet<UserContact> UserContacts { get; set; }
    }
}
