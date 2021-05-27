using Application.Core;
using Domain.Qeraat2;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserContacts
{
  public  class Details
    {
        public class Query : IRequest<Result<UserContact>>
        {
            public int Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<UserContact>>
        {
            private readonly Qeraat2Context _context;

            public Handler(Qeraat2Context context)
            {
                _context = context;
            }
            public async Task<Result<UserContact>> Handle(Query request, CancellationToken cancellationToken)
            {
                var UserContact= await _context.UserContacts.FindAsync(request.Id);
                return Result<UserContact>.Success(UserContact);
            }
        }
    }
    
}
