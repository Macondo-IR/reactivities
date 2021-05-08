
using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;


namespace Persistence
{
    public  class PoemContext : DbContext
    {
        public PoemContext(DbContextOptions<PoemContext> options) : base(options)
        {
        }
        public virtual DbSet<Poem> Poems { get; set; }
        public virtual DbSet<PoemIndex> PoemIndices { get; set; }
        public virtual DbSet<Poet> Poets { get; set; }
        public virtual DbSet<PoetMasterpiece> PoetMasterpieces { get; set; }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            if (!optionsBuilder.IsConfigured)
//            {
//#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
//                optionsBuilder.UseSqlServer("server=.;DataBase=Ganjoor2;User Id=Sa;Password=1;");
//            }
//        }

        //        protected override void OnModelCreating(ModelBuilder modelBuilder)
        //        {
        //            modelBuilder.HasAnnotation("Relational:Collation", "Albanian_100_CI_AS");

        //            modelBuilder.Entity<Poem>(entity =>
        //            {
        //                entity.ToTable("Poem", "Poem");

        //                entity.Property(e => e.Id).ValueGeneratedNever();

        //                entity.Property(e => e.PoemId).HasColumnName("poem_id");

        //                entity.Property(e => e.Position).HasColumnName("position");

        //                entity.Property(e => e.SortId).ValueGeneratedOnAdd();

        //                entity.Property(e => e.Text).HasColumnName("text");

        //                entity.Property(e => e.Vorder).HasColumnName("vorder");

        //                entity.HasOne(d => d.PoemIndex)
        //                    .WithMany(p => p.Poems)
        //                    .HasForeignKey(d => d.PoemIndexId)
        //                    .OnDelete(DeleteBehavior.ClientSetNull)
        //                    .HasConstraintName("Fk_Poem_index4");

        //                entity.HasOne(d => d.PoetMasterpiece)
        //                    .WithMany(p => p.Poems)
        //                    .HasForeignKey(d => d.PoetMasterpieceId)
        //                    .OnDelete(DeleteBehavior.ClientSetNull)
        //                    .HasConstraintName("Fk_Poem_index3");
        //            });

        //            modelBuilder.Entity<PoemIndex>(entity =>
        //            {
        //                entity.ToTable("PoemIndex", "Poem");

        //                entity.Property(e => e.Id).ValueGeneratedNever();

        //                entity.Property(e => e.BookId).HasColumnName("book_id");

        //                entity.Property(e => e.MainUrl).IsUnicode(false);

        //                entity.Property(e => e.ParentUrl).IsUnicode(false);

        //                entity.Property(e => e.PoemIndexId).HasColumnName("Poem_index_id");

        //                entity.HasOne(d => d.PoetMasterpiece)
        //                    .WithMany(p => p.PoemIndices)
        //                    .HasForeignKey(d => d.PoetMasterpieceId)
        //                    .OnDelete(DeleteBehavior.ClientSetNull)
        //                    .HasConstraintName("Fk_Poem_index");
        //            });

        //            modelBuilder.Entity<Poet>(entity =>
        //            {
        //                entity.ToTable("Poet", "Poem");

        //                entity.Property(e => e.Id).ValueGeneratedNever();
        //            });

        //            modelBuilder.Entity<PoetMasterpiece>(entity =>
        //            {
        //                entity.ToTable("PoetMasterpiece", "Poem");

        //                entity.Property(e => e.Id).ValueGeneratedNever();

        //                entity.Property(e => e.Url).IsUnicode(false);

        //                entity.HasOne(d => d.Poet)
        //                    .WithMany(p => p.PoetMasterpieces)
        //                    .HasForeignKey(d => d.PoetId)
        //                    .OnDelete(DeleteBehavior.ClientSetNull)
        //                    .HasConstraintName("Fk_PoetId");
        //            });

        //         }

    }
}
