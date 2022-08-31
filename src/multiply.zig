const std = @import("std");
const expect = std.testing.expect;

export fn multiply(a: i32, b: i32) i32 {
    return a * b;
}

test "basic multiplication functionality" {
    try expect(multiply(3, 7) == 21);
}
