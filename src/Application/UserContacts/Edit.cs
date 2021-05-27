using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using Domain.Qeraat2;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.UserContacts
{
  public class Edit
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
        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly Qeraat2Context _context;
            private readonly IMapper _mapper;

            public Handler(Qeraat2Context context,IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Result<Unit>>  Handle(Command request, CancellationToken cancellationToken)
            {
                var UserContact = await _context.UserContacts.FindAsync(request.UserContact.Id);
                if (UserContact == null) return null;
                _mapper.Map(request.UserContact, UserContact);
                var result=await _context.SaveChangesAsync()>0;
                if (!result) return Result<Unit>.Failure("Failed to update UserContact");
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
