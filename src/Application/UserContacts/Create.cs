using Application.Core;
using Domain.Qeraat2;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Application.UserContacts
{
  public  class Create
    {
        public class Command : IRequest<Result<Unit>>
        {
            public UserContact UserContact { get; set; }
        }
        public class CommandValidator : AbstractValidator<Command>
        { 
            public CommandValidator()
            {
                RuleFor(x => x.UserContact).SetValidator(new UserContactValidator());
            }
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
                await _context.UserContacts.AddAsync(request.UserContact);
                var result=await _context.SaveChangesAsync()>0;
                if (!result) return Result<Unit>.Failure("Failed to create UserContact");
                return Result<Unit>.Success(Unit.Value); 
                
            } 
        }
    }
}
