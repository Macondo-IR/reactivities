using Application.Contacts;
using Domain;
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
    public class ContactsController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Contact>>>GetContacts()
        {
            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        public async  Task<ActionResult<Contact>> GetContact(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
        [HttpPost]
        public async Task<IActionResult> CreateContact(Contact contact)
        {
            return Ok(await Mediator.Send(new Create.Command { Contact = contact }));
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> EditContact(Guid id, Contact contact)
        {
            contact.Id = id;
            return Ok(await Mediator.Send(new Edit.Command { Contact = contact }));
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(Guid id)
        {
            return Ok(await Mediator.Send(new Delete.Command { Id=id }));
        }


    }
}
