using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Domain.Qeraat2
{
   public class UserContact
    {
        public int Id { get; set; }
        public int ZoneId { get; set; }
        public string UserId { get; set; }
        public string PersonelName { get; set; }
        public string Post { get; set; }
        public string Personelcode { get; set; }
        public string Meli { get; set; }
        public string Phone  { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string English { get; set; }
        public string Address { get; set; }
    }
}
