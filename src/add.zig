const std = @import("std");
const expect = std.testing.expect;

export fn add(a: i32, b: i32) i32 {
    return a + b;
}

test "basic add functionality" {
    try expect(add(3, 7) == 10);
}
