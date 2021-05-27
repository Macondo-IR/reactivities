using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Domain.Qeraat2;
using MediatR;
using Persistence;

namespace Application.UserContacts
{
  public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid  Id { get; set; }
        }
        public class Handler : IRequestHandler<Command,Result<Unit>>
        {
            private readonly Qeraat2Context _context;

            public Handler(Qeraat2Context context)
            {
                _context = context;
            }
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var UserContact = await _context.UserContacts.FindAsync(request.Id);
               // if (UserContact == null)                    return null;
                 _context.Remove(UserContact);
                var result=await _context.SaveChangesAsync()>0;
                if (!result) return Result<Unit>.Failure("Failed to delete UserContact");
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
