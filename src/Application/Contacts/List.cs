using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Contacts
{
  public  class List
    {
        public class Query : IRequest<List<Contact>> { }
        public class Handler : IRequestHandler<Query, List<Contact>>
        {
            private readonly DataContext _context;

            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<List<Contact>> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Contacts.ToListAsync();            }
            }
    }
}
