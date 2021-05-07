using System;
using System.Collections.Generic;

#nullable disable

namespace Domain
{
    public  class PoetMasterpiece
    {
        public PoetMasterpiece()
        {
            PoemIndices = new HashSet<PoemIndex>();
        }

        public Guid Id { get; set; }
        public Guid PoetId { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }

        public virtual Poet Poet { get; set; }
        public virtual ICollection<PoemIndex> PoemIndices { get; set; }
    }
}
