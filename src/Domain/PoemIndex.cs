using System;
using System.Collections.Generic;

#nullable disable

namespace Persistence
{
    public partial class PoemIndex
    {
        public PoemIndex()
        {
            Poems = new HashSet<Poem>();
        }

        public Guid Id { get; set; }
        public Guid PoetMasterpieceId { get; set; }
        public int PoemIndexId { get; set; }
        public int? BookId { get; set; }
        public string ParentTitle { get; set; }
        public string MainTitle { get; set; }
        public string MainUrl { get; set; }
        public string ParentUrl { get; set; }

        public virtual PoetMasterpiece PoetMasterpiece { get; set; }
        public virtual ICollection<Poem> Poems { get; set; }
    }
}
