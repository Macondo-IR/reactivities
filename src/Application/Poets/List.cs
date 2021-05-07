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

namespace Application.Poets
{
  public  class List
    {
        public class Query : IRequest<List<Poet>> { }
        public class Handler : IRequestHandler<Query, List<Poet>>
        {
            private readonly PoemContext _context;

            public Handler(PoemContext context)
            {
                _context = context;
            }

            public async Task<List<Poet>> Handle(Query request, CancellationToken cancellationToken)
            {
                return  await _context.Poets.ToListAsync(); ;
            }
        }
    }
}
