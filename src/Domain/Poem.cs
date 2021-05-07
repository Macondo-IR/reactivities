using System;
using System.Collections.Generic;

#nullable disable

namespace Domain
{
    public  class Poem
    {
        public Guid Id { get; set; }
        public Guid PoemIndexId { get; set; }
        public int SortId { get; set; }
        public int? PoemId { get; set; }
        public int? Vorder { get; set; }
        public int? Position { get; set; }
        public string Text { get; set; }

        public virtual PoemIndex PoemIndex { get; set; }
    }
}
