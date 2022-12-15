using FinalProject.Data;
using FinalProject.Models;
using Microsoft.AspNetCore.DataProtection;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace FinalProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AccountController : ControllerBase
    {
        //private readonly IDataProtector _protector;

        //public AccountController(IDataProtectionProvider provider)
        //{
        //    _protector = provider.CreateProtector("38%9¨&8$2@49");
        //}

        private readonly IJWTAuthenticationManager jwtAuthenticationManager;

        public AccountController(IJWTAuthenticationManager jwtAuthenticationManager)
        {
            this.jwtAuthenticationManager = jwtAuthenticationManager;
        }


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
            var accounts = await contexto
                .Accounts
                .AsNoTracking()
                .FirstOrDefaultAsync(a => a.Id == id);

            return accounts == null ? NotFound() : Ok(accounts);
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
                //string text = this._protector.Protect(account.Password);
                //account.Password = text;

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
                //string text = account.Password;
                //p.encrypt(text);
                //account.Password = text;


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

        [AllowAnonymous]
        [HttpPost("authenticate")]

        public IActionResult Authenticate([FromBody] Usuario user)
        {
            var token = jwtAuthenticationManager.Authenticate(
                user.Username, user.Password);

            if (token == null)
            {
                return Unauthorized();
            }

            return Ok(token);
        }
    }
}
