using Domain.Qeraat2;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.UserContacts
{
    public    class UserContactValidator : AbstractValidator<UserContact>

    {
        public UserContactValidator()
        {
            RuleFor(x => x.Id).NotEmpty();
            RuleFor(x => x.FirstName).NotEmpty();
            RuleFor(x => x.LastName).NotEmpty();
            RuleFor(x => x.PersonelName).NotEmpty();
            RuleFor(x => x.Phone).NotEmpty();

        }
    }
}
