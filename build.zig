const std = @import("std");

const CrossTarget = std.zig.CrossTarget;

const fs = std.fs;
const path = std.fs.path;
const info = std.log.info;
const endsWith = std.mem.endsWith;
const concat = std.mem.concat;
const lastIndexOfScalar = std.mem.lastIndexOfScalar;

pub fn build(b: *std.build.Builder) !void {
    b.setPreferredReleaseMode(.ReleaseFast);
    const mode = b.standardReleaseOptions();

    // find all zig source code
    const src_dir_name = "src";
    // TODO: Perhaps derive a convention for root-level libraries
    var src_dir = try fs.cwd().openIterableDir(src_dir_name, .{});
    defer src_dir.close();

    var src_dir_it = src_dir.iterate();

    while (try src_dir_it.next()) |entry| {
        if (entry.kind != .File) {
            continue;
        }

        const lib_file_name = entry.name;

        if (!endsWith(u8, lib_file_name, ".zig")) {
            continue;
        }

        const lib_file = b.fmt("{s}/{s}", .{
            src_dir_name,
            lib_file_name,
        });

        const ext_index = lastIndexOfScalar(
            u8,
            lib_file_name,
            '.',
        ) orelse 0;

        const lib_name = lib_file_name[0..ext_index];

        const lib = b.addSharedLibrary(
            lib_name,
            lib_file,
            .unversioned,
        );

        lib.setTarget(CrossTarget{
            .cpu_arch = .wasm32,
            .os_tag = .freestanding,
        });

        lib.setBuildMode(mode);
        lib.install();

        const lib_test = b.addTest(lib_file);
        lib_test.setBuildMode(mode);

        const lib_test_name = b.fmt("{s}{s}", .{
            "test-",
            lib_name,
        });

        const test_step = b.step(
            lib_test_name,
            "Run library tests",
        );
        test_step.dependOn(&lib_test.step);
    }
}
