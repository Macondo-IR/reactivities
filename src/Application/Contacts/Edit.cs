﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;

namespace Application.Contacts
{
  public class Edit
    {
        public class Command : IRequest
        {
            public Contact Contact { get; set; }
        }
        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context,IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }
            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var contact = await _context.Contacts.FindAsync(request.Contact.Id);
                _mapper.Map(request.Contact, contact);
                await _context.SaveChangesAsync();
                return Unit.Value;
            }
        }

    }
}
