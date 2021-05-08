using System;
using System.Collections.Generic;

#nullable disable

namespace Domain
{
    public  class Poet
    {
        public Poet()
        {
            PoetMasterpieces = new HashSet<PoetMasterpiece>();
        }
   

        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }

        public virtual ICollection<PoetMasterpiece> PoetMasterpieces { get; set; }

  
     }
}
