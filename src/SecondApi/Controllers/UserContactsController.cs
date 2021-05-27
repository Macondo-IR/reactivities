using Application.UserContacts;
using Domain.Qeraat2;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecondApi.Controllers
{
    public class UserContactsController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<UserContact>>> GetUserContacts()

        {
            return HandleResult(await Mediator.Send(new List.Query()));
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<UserContact>> GetContact(Guid id)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Id = id }));
        }

        [HttpGet("search/{value}")]
        public async Task<ActionResult<UserContact>> GetContact(string value)
        {
            return HandleResult(await Mediator.Send(new SearchByName.Query { Name = value }));
        }
        [HttpPost]
        public async Task<IActionResult> CreateContact(UserContact contact)
        {
            return HandleResult(await Mediator.Send(new Create.Command { UserContact = contact }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditContact(Guid id, UserContact contact)
        {
            contact.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { UserContact = contact }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command { Id = id }));
        }


    }
}
