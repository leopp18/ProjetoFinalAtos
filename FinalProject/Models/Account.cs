using System;
using System.Collections.Generic;

namespace FinalProject.Models;

public partial class Account
{
    public int Id { get; set; }

    public string? Software { get; set; }

    public string? Login { get; set; }

    public string? Password { get; set; }

    public DateTime? LastDate { get; set; }
}
