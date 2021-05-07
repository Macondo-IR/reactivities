using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.Poets
{
  public  class Details
    {
        public class Query : IRequest<Poet> 
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Poet>
        {
            private readonly PoemContext _context;

            public Handler(PoemContext context)
            {
                _context = context;
            }
            public async Task<Poet> Handle(Query request, CancellationToken cancellationToken)
            {
                return await _context.Poets.FindAsync(request.Id);
            }
        }
    }
    
}
