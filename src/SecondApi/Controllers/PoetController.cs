using Application.Poets;
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
    public class PoetController : BaseApiController
    {

        [HttpGet]
        public async Task<ActionResult<List<Poet>>>GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<Poet>> GetPoet(Guid id)
        {
            return await Mediator.Send(new Details.Query { Id = id });
        }
    }



}
