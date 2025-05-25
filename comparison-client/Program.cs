using System.Diagnostics;
using System.Net.Http.Json;

var endpoints = new[] {
    (Name: "Node.js", Url: "http://localhost:3001/echo?message=ping"),
    (Name: ".NET", Url: "http://localhost:3002/echo?message=ping")
};

using var http = new HttpClient();

Console.WriteLine("Measuring response times (10 requests each)...\n");

foreach (var ep in endpoints)
{
    var times = new List<long>();
    for (int i = 0; i < 10; i++)
    {
        var sw = Stopwatch.StartNew();
        var res = await http.GetFromJsonAsync<EchoResponse>(ep.Url);
        sw.Stop();
        times.Add(sw.ElapsedMilliseconds);
    }

    Console.WriteLine($"Results for {ep.Name}:");
    Console.WriteLine($"  Min: {times.Min()} ms");
    Console.WriteLine($"  Max: {times.Max()} ms");
    Console.WriteLine($"  Avg: {times.Average():F2} ms\n");
}

record EchoResponse(DateTime Timestamp, string Payload);
