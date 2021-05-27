using Application.Core;
using Domain.Qeraat2;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserContacts
{
    public class SearchByName
    {

        public class Query : IRequest<Result<List<UserContact>>> {
            public string Name { get; set; }

        }
        public class Handler : IRequestHandler<Query, Result<List<UserContact>>>
        {
            private readonly Qeraat2Context _context;

            public Handler(Qeraat2Context context)
            {
                _context = context;
            }

            public async Task<Result<List<UserContact>>> Handle(Query request, CancellationToken cancellationToken)
            {
                return Result<List<UserContact>>.Success(await _context.UserContacts.Where(p=>p.PersonelName.Contains(request.Name)).ToListAsync());
            }
        }

    }

}
