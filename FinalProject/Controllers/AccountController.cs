using FinalProject.Data;
using FinalProject.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AccountController : ControllerBase
    {
        [HttpGet]
        [Route("accounts")]

        public async Task<IActionResult> getAllAsync(//consulta geral
           [FromServices] Contexto contexto)
        {
            var a = await contexto
                .Accounts
                .AsNoTracking()
                .ToListAsync();
            return a == null ? NotFound() : Ok(a);
        }

        [HttpGet]
        [Route("accounts/{id}")]

        public async Task<IActionResult> getByIdAsync(//consulta por id
            [FromServices] Contexto contexto,
            [FromRoute] int id)
        {
            var pessoas = await contexto
                .Accounts
                .AsNoTracking()
                .FirstOrDefaultAsync(p => p.Id == id);

            return pessoas == null ? NotFound() : Ok(pessoas);
        }


        [HttpPost]
        [Route("accounts")]

        public async Task<IActionResult> PostAsync(//cadastro
            [FromServices] Contexto contexto,
            [FromBody] Account account)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            try
            {
                await contexto.Accounts.AddAsync(account);
                await contexto.SaveChangesAsync();
                return Created($"api/Accounts/{account.Id}", account);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut]
        [Route("accounts/{id}")]
        public async Task<IActionResult> PutAsync(//editar
            [FromServices] Contexto contexto,
            [FromBody] Account account,
            [FromRoute] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest("Model inválida");
            var a = await contexto.Accounts
                .FirstOrDefaultAsync(x => x.Id == id);

            if (a == null)
                return NotFound("Pessoa não encontrada");

            try
            {
                a.Software = account.Software;
                a.Login = account.Login;
                a.Password = account.Password;
                a.LastDate = account.LastDate;

                contexto.Accounts.Update(a);
                await contexto.SaveChangesAsync();
                return Ok(a);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("Accounts/{id}")]
        public async Task<IActionResult> DeleteAsync(//deletar
            [FromServices] Contexto contexto,
            [FromRoute] int id)
        {
            var a = await contexto.Accounts
                .FirstOrDefaultAsync(x => x.Id == id);

            if (a == null)
                return NotFound("Pessoa não encontrada");

            try
            {
                contexto.Accounts.Remove(a);
                await contexto.SaveChangesAsync();
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
